
#FROM python:latest

#COPY . .
#RUN pip install -r requirements.txt

#ADD /app.py .
#ADD app.py .

#CMD ["flask", "run", "--host", "0.0.0.0"]
#ENTRYPOINT python app.py

#
# Original code
#
# FROM nginx:alpine

# LABEL maintainer="Jihane Eter <jeter@ucdavis.edu>"

# COPY . /usr/share/nginx/html
#
#

# CMD ["python", "app.py"]

# ENTRYPOINT python app.py


## "docker run -d -p 80:7000 arenatask:latest"
# EXPOSE 7000
# CMD python -m http.server 7000

#CMD ["flask", "run", "-h", "0.0.0.0", "-p", "7000"]

FROM python:3.6.1-alpine
ADD . .
RUN pip install -r requirements.txt
CMD ["python","app.py"]