FROM glassfish
MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

RUN apt-get update

#Clone the docker file into the container
RUN git clone https://github.com/scorelab/OpenDF /home/OpenDF
RUN /home/OpenDF/scripts/setup.sh

EXPOSE 8080
EXPOSE 4848
