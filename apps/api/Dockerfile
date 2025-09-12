# Use an official, slim Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file into the container first.
# This leverages Docker's layer caching, so dependencies are only re-installed if this file changes.
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN mkdir -p /data/cache && chown -R 1000:1000 /data/cache

# Copy the rest of your application's source code into the container
COPY . /code/

ENV DEEPFACE_HOME=/data/cache

# Expose the port the app will run on. Hugging Face Spaces uses port 7860 by default for Docker.
EXPOSE 7860

# The command to run your application when the container launches.
# We use --host 0.0.0.0 to make the app accessible from outside the container.
# The model file will be downloaded by the GitHub Action, not inside this Dockerfile.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]