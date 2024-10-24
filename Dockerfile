# Usar uma imagem base leve do Nginx
FROM nginx:alpine

# Copiar os ficheiros da aplicação para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para o Nginx servir a aplicação
EXPOSE 80
