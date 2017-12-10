FROM glassfish
MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

WORKDIR /home/OpenDF

COPY /scripts/setup.sh /scripts/setup.sh

RUN apt-get update \ 
&& ./scripts/setup.sh

EXPOSE 8080
EXPOSE 4848

LABEL org.label-schema.name="SCoRe Lab Community"
LABEL org.label-schema.description="Digital forensic tool to find evidences more easily"
LABEL org.label-schema.url="http://www.scorelab.org/"
LABEL org.label-schema.vcs-url="https://github.com/scorelab/OpenDF"
LABEL org.label-schema.vcs-ref=""
LABEL org.label-schema.vendor="SCoRe Lab"
LABEL org.label-schema.version=""
LABEL org.label-schema.schema-version="1.0"
