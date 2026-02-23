// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { DS_ORM_ENTITYES } from '../model';

export default {
  swagger: {
    path: '/swagger/'
  },
  clients: {
    redis: {
      port: parseInt(process.env.REDIS_PORT) || 6379,
      host: process.env.REDIS_HOST || 'localhost',
      maxListeners: parseInt(process.env.REDIS_MAX_LISTENERS) || 100
      // db: env.get('REDIS_DB').asString(),
      // isEnabled: env.get('ENABLED_REDIS').asBool()
    },
    mysql: {
      type: 'mysql',
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: process.env.MYSQL_PORT || 3306,
      database: process.env.MYSQL_DATABASE || 'proto',
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'qwertyU$%1201',
      insecureAuth: true,
      // entities: DS_ORM_ENTITYES,
      charset: 'utf8_bin',
      logging: false,
      synchronize: false
    }
  },
  docker: {
    nginxName: process.env.DOCKER_NGINX_NAME || 'qt-nginx',
    nginxSitesDir: process.env.HOSTING_NGINX_SITES || './nginx/sites'
  },
  auth: {
    // https://cuppalabs.github.io/ng2-social-login/documentation/
    google: {
      // https://console.cloud.google.com/apis/credentials?folder=&organizationId=&project=voice-1008
      // https://medium.com/@danilrabizo/google-authentication-in-the-angular-application-e86df69be58a
      id: '1020482812877-910if2ubjt0he07q96g8o4qd9dlggo8d.apps.googleusercontent.com',
      secret: 'u8Ed7w4D2JhAdkmx_v1fIvow' // localhost:4200
    },
    github: {
      id: '417c769faa34cf28b0bd',
      secret: '89bf1051fd008f4fcd638494aabda9559e4bf98c'
    },
    // facebook: {// https://developers.facebook.com/apps/
    //  id: '',
    //  secret: ''
    // },
    // linkedin: {// https://www.linkedin.com/developer/apps
    //  id: '',
    //  secret: ''
    // },
    SECRETKEY: 'M6[n0@u0t[O$Q5('
  },
  media: {
    MEDIA_DIR: process.env.MEDIA_DIR || './media/data'
  }
};
