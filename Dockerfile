FROM public.ecr.aws/lambda/provided:al2

RUN yum install -y unzip jq

# install aws-cli v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install

# install kubectl
RUN curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl && \
  chmod +x kubectl && \
  mv kubectl /usr/local/bin/kubectl

COPY bootstrap /var/runtime/bootstrap
COPY function.sh /var/task/function.sh
COPY main.sh /var/task/main.sh
RUN chmod +x /var/runtime/bootstrap /var/task/function.sh /var/task/main.sh

WORKDIR /var/task
CMD [ "function.sh.handler" ]
