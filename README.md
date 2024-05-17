How to run the project?

1. Install Docker

2. In project directory, run command
  ``` docker build -t my-image-name . ```

3. Then run:
  ``` docker run -d -p 8080:8080 --name my-container-name -v "/absolute/path/to/task/folder/on/my/computer:/app" my-image-name ```

4. If you want to stop running container, run
  ``` docker stop my-container-name ```

5. If you want to remove container, run
  ``` docker rm my-container-name ```

6. If you want to remove image, run
  ``` docker image rm my-image-name ```

7. If you want to remove anonymous volumes, run
  ``` docker volume ls ```
  and then
  ``` docker volume rm chosen-volume-name ```