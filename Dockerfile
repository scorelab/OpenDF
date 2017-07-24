FROM glassfish
MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

ARG OPENDF_REPO=https://github.com/scorelab/OpenDF.git
ARG OPENDF_BRANCH=master

EXPOSE 8080
EXPOSE 4848

RUN apt-get update

COPY . /OpenDF
WORKDIR /OpenDF


RUN scripts/build.sh

ENTRYPOINT scripts/run.sh


