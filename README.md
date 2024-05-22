# Ticketing System - Asynchronous Microservices Project

This project aims to create a robust infrastructure for a microservices architecture using MongoDB, NATS, Kubernetes, Express, Next.js, and more. The system allows for the listing and purchasing of concert tickets within a specific time frame. The primary focus of this project is on the server-side, while the client-side is kept simple.

## Architecture

![Architecture Diagram](https://github.com/eyalItzhak/microservices_projects/assets/62293316/4140b6b1-8125-4c56-a8fa-7fd9fec75327)

HTTP requests are directed to the appropriate service by ingress-nginx based on the URL. Each service is independent, with its own database, and does not directly communicate with other services. Inter-service communication is handled by an event bus (NATS). TypeScript was used to maintain consistency across services, and common code sections were published to npm.

The [shared library](https://github.com/eyalItzhak/microservices-common) ([npm](https://www.npmjs.com/package/@eyaltickets/common)) includes custom errors, middlewares, and events.

## Installation

To install and run the project, the following prerequisites must be installed:

1. Docker + Kubernetes
2. Ingress nginx
3. Skaffold
4. Node.js

### Docker + Kubernetes:

[Download Docker + Kubernetes](https://www.docker.com/)

### Ingress nginx:

[Download Ingress nginx](https://kubernetes.github.io/ingress-nginx)

Alternatively, use this command:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

#### Skaffold:

First, download and install Chocolatey:
[download](https://chocolatey.org/install)
Then, run the following commands in bash:

```bash
"Get-ExecutionPolicy"
```

If it returns "Restricted", then run:

```bash
Set-ExecutionPolicy AllSigned
```

or

```bash
Set-ExecutionPolicy Bypass -Scope Process
```

Finally, install Skaffold:

```bash
choco install -y skaffold
```

---

After installation, add the following line to your host file:

```bash
127.0.0.1 ticketing.dev
```

On Windows, the path to the host file is:

```bash
C:\Windows\System32\drivers\etc\hosts
```

---

Note: You must upload the images to your Docker user and replace "eyalpross101" in the k8s folder with your Docker username.

You need to define 2 environment variables through Kubernetes: jwt-secret and stripe-secret.
The first is a private key for jwt encryption.
The second is an ID key for the stripe credit company - you can register for free.

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_key_here
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your_stripe_key_here
```

To run the project, execute the following command in your terminal:

```bash
skaffold dev
```

## API Reference

### Auth Service

#### Signup

```http
  POST https://ticketing.dev/api/users/signup
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

Retrun session cookie + user details and registers the user to the system.

#### Signin:

```http
  POST https://ticketing.dev/api/users/signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

Retrun session cookie + user details If the user is registered to the system.

#### Current User:

```http
  GET https://ticketing.dev/api/users/currentuser
```

If a suitable cookie is provided, the logged in user information will be returned.

#### Signout:

```http
  GET https://ticketing.dev/api/users/signout
```

Remove session cookie.

---

### Order Service

Manages ticket orders.

#### Create Order:

```http
  POST https://ticketing.dev/api/orders
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `ticketId` | `string` | **Required** |

#### Get All Orders:

```http
  GET https://ticketing.dev/api/orders
```

#### Get Specific Order:

```http
  GET https://ticketing.dev/api/orders/{orderId}
```

---

### Payments Service

Handles payment processing.

#### Create Payment:

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `orderId` | `string` | **Required** |
| `token`   | `string` | **Required** |

---

### Tickets Service

Manages ticket listings.

#### Create Ticket:

```http
  POST https://ticketing.dev/api/tickets
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `title`   | `string` | **Required** |
| `price`   | `number` | **Required** |

#### Get Ticket:

```http
  GET https://ticketing.dev/api/tickets/{ticketId}
```

#### Get All Tickets:

```http
  GET https://ticketing.dev/api/tickets
```

#### Update Ticket

```http
  PUT https://ticketing.dev/api/tickets/{ticketId}
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `title`   | `string` | **Required** |
| `price`   | `number` | **Required** |
