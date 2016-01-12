FROM glassfish
MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

RUN apt-get update

RUN mkdir -p /home/OpenDF
RUN apt-get install git
RUN git clone https://github.com/scorelab/OpenDF.git /home/OpenDF
RUN chmod 755 /home/OpenDF/scripts/setup.sh
RUN /home/OpenDF/scripts/setup.sh

EXPOSE 8080
EXPOSE 4848
