
# Ticketing - asynchronous microservices project


The purpose of this project is to produce a good infrastructure for working with a microservice architecture using MongoDB, NATS, Kubernetes, Express, nextjs and more.

The system offers the publication of concert tickets for sale and their purchase within a certain time frame where the emphasis in this project is on the server side while the client side is very basic.


## Installation

In order to install and run the project, several things must be downloaded and installed.

    1. Docker + Kubernetes
    2. Ingress nginx
    3. Skaffold
    4. Node.js

#### Docker + Kubernetes:

[download]( https://www.docker.com/ )
#### Ingress nginx:
[download]( https://kubernetes.github.io/ingress-nginx )
or use this command 
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```
#### Skaffold:
You need to download and install chocolatey individual first -
[download]( https://chocolatey.org/install)
Then run the following commands on bash:

```bash
Run "Get-ExecutionPolicy"
```
If it returns Restricted, then run
```bash
Set-ExecutionPolicy AllSigned
```
or
```bash
Set-ExecutionPolicy Bypass -Scope Process
```
then run :
```bash
choco install -y skaffold
```
## API Reference

### auth service
#### signup

```http
  POST https://ticketing.dev/api/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

     retrun cookie + user details and registers the user to the system


#### signin:

```http
  POST https://ticketing.dev/api/users/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

     retrun cookie + user details If the user is registered to the system


#### currentuser:

```http
  GET https://ticketing.dev/api/users/currentuser
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
    If a suitable cookie is provided, the logged in user information will be returned



#### singout:

```http
  GET https://ticketing.dev/api/users/singout
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
    remove cookie


### order service

#### order create:

```http
  POST https://ticketing.dev/api/orders
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ticketId` | `string` | **Required** |
    
    create an order.


#### order create:

```http
  GET https://ticketing.dev/api/orders
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
    get all order.

### payments service
#### payments create:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `string` | **Required** |
| `token` | `string` | **Required** |
    create an payments.
    token come from Stripe or use the val "tok_visa" when dev.

### tickets service
#### tickets create:
```http
  POST https://ticketing.dev/api/tickets
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `price` | `number` | **Required** |
    
    create an ticket.


#### get ticket:
```http
  GET https://ticketing.dev/api/tickets/{ticketId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
    get an ticket with id of {ticketId}.

#### get tickets:
```http
  GET https://ticketing.dev/api/tickets
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
    get all tickets.

#### update ticket:
```http
  PUT https://ticketing.dev/api/tickets/{ticketId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `price` | `number` | **Required** |
    
    update a ticket.
