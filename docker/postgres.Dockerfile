# Dockerfile 
FROM postgres:14.4-alpine

# Arguments
ARG APP_LOCALE=pt_BR
ARG APP_CHARSET=UTF-8

# Environment
ENV PG_HOME=/var/lib/postgresq
ENV MUSL_LOCPATH="/usr/share/i18n/locales/musl"

# Update dependences
RUN apk update

# install libintl
# then install dev dependencies for musl-locales
# clone the sources
# build and install musl-locales
# remove sources and compile artifacts
# lastly remove dev dependencies again
RUN apk --no-cache add libintl && \
	apk --no-cache --virtual .locale_build add cmake make musl-dev gcc gettext-dev git && \
	git clone https://gitlab.com/rilian-la-te/musl-locales && \
	cd musl-locales && cmake -DLOCALE_PROFILE=OFF -DCMAKE_INSTALL_PREFIX:PATH=/usr . && make && make install && \
	cd .. && rm -r musl-locales && \
	apk del .locale_build

# Install language pack
RUN apk --no-cache add ca-certificates wget vim

# Set locale
# RUN locale-gen ${APP_LOCALE}
# RUN /usr/glibc-compat/bin/localedef  ${APP_LOCALE}.${APP_CHARSET} -i ${APP_LOCALE} -f ${APP_CHARSET}

# Create folder
RUN mkdir -p /database

# Copy sql
COPY ./docker/database.sql /database/database.sql

# Copy entrypoit
COPY ./docker/postgres-entrypoint.sh /database/postgres-entrypoint.sh

# Set permissions
RUN chown -R postgres:postgres /database
RUN chmod -R 777 /database
RUN chown -R postgres:postgres /run
RUN chmod -R 777 /run

# Network
# RUN export DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)

# Set user
USER postgres

WORKDIR ${PG_HOME}

# Init database
# RUN initdb /var/lib/postgresql/data
# RUN pg_ctl -D /var/lib/postgresql/data -l logfile start

# Entrypoint
ENTRYPOINT ["/database/postgres-entrypoint.sh"]

# Run sql
# CMD ["/usr/lib/postgresql/14.4/bin/postgres", "-D", "/var/lib/postgresql/14.4/main", "-c", "config_file=/etc/postgresql/14.4/main/postgresql.conf"]