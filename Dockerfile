FROM glassfish
MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

WORKDIR /home/OpenDF

COPY . .

RUN apt-get update \ 
&& ./scripts/setup.sh

EXPOSE 8080
EXPOSE 4848

LABEL multi.org.label-schema.name = "OpenDF" \
      multi.org.label-schema.description = "OpenDF is an Open-source digital forensic tool to find evidences more easily." \
      multi.org.label-schema.url="https://github.com/scorelab/OpenDF/wiki" \
      multi.org.label-schema.vcs-url = "https://github.com/scorelab/OpenDF" \
      multi.org.label-schema.vcs-ref = "279FA63" \
      multi.org.label-schema.vendor = "Sustainable Computing Research Group" \
      multi.org.label-schema.version = "9-december-2017" \
      multi.org.label-schema.schema-version = "1.0"
