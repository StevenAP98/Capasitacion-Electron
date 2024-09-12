# Usa una imagen base oficial de Node.js
FROM node:14

# Instala dependencias necesarias para ejecutar Electron
RUN apt-get update && apt-get install -y \
    xvfb \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    dbus \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Configura el entorno para ejecutar Electron
ENV DISPLAY=:99

# Expone el puerto (si tu aplicación lo requiere)
EXPOSE 3000

# Define el comando que se ejecutará cuando se inicie el contenedor
CMD ["xvfb-run", "--auto-servernum", "npm", "start"]