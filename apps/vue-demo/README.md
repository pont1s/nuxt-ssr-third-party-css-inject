# @uteka/vue-demo

### 1. Create self-signed SSL

How install mkcert, see: https://github.com/FiloSottile/mkcert

Generate the certificates:

```bash
mkcert -key-file vue-demo-localhost-key.pem -cert-file vue-demo-localhost.pem uteka.local "*.uteka.local" localhost "*.localhost" 127.0.0.1 ::1
```

Install the local CA in the system trust store:

```bash
mkcert -install
```
