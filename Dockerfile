
FROM python

WORKDIR /opt/
COPY /app .

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
#CMD ["flask", "run", "--host", "0.0.0.0"]
#ENTRYPOINT python app.py

FROM nginx:alpine

MAINTAINER Jihane Eter <jeter@ucdavis.edu>

COPY . /usr/share/nginx/html



