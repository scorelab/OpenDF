FROM glassfish
MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

RUN apt-get update

RUN mkdir -p /home/OpenDF
RUN git clone https://github.com/scorelab/OpenDF.git /home/OpenDF
RUN /home/OpenDF/scripts/setup.sh

EXPOSE 8080
EXPOSE 4848
