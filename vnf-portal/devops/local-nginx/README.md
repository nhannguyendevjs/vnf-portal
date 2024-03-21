```bash
docker run --name local-nginx -v d:/Personal/docker-local-nginx/html:/usr/share/nginx/html -v d:/Personal/docker-local-nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v d:/Personal/docker-local-nginx/conf.d:/etc/nginx/conf.d -v d:/Personal/docker-local-nginx/conf/mime.types:/etc/nginx/mime.types -p 80:8080 -p 443:8443 -d nginx
```
