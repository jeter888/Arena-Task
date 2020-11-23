
FROM python:latest

COPY /app .

RUN pip install -r requirements.txt

ADD /app/app.py .
#CMD ["flask", "run", "--host", "0.0.0.0"]
#ENTRYPOINT python app.py



# FROM nginx:alpine

# LABEL maintainer="Jihane Eter <jeter@ucdavis.edu>"

# COPY . /usr/share/nginx/html


# CMD ["python", "app.py"]

# ENTRYPOINT python app.py

COPY . .
EXPOSE 7000
CMD python -m http.server 7000
