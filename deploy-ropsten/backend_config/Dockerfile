FROM python:3.7
WORKDIR /backend
RUN echo -e "Flask_Cors==3.0.10\nFlask==2.0.0\nhexbytes==0.2.1\nweb3==5.19.0\n" > requirements.txt
RUN cat requirements.txt
RUN pip3 install  Flask_Cors
RUN pip3 install Flask
RUN pip3 install web3

CMD ["python3","back.py"]