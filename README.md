
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
---
After that, you need to add the following line of code to the host file.
```bash
127.0.0.1 ticketing.dev 
```
on windows the path is :
```bash
C:\Windows\System32\drivers\etc\hosts
```
---
Note : you must upload the images to your Docker user and change in the k8s folder the appearances of "eyalpross101"to your Docker username.


To run the project, all you have to do is write the following command in cmd: skaffold dev
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
If a suitable cookie is provided, the logged in user information will be returned



#### singout:

```http
  GET https://ticketing.dev/api/users/singout
```
    
remove cookie

---
### order service

#### order create:

```http
  POST https://ticketing.dev/api/orders
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ticketId` | `string` | **Required** |
    
create an order.


#### get all order:

```http
  GET https://ticketing.dev/api/orders
```
get all order.

#### get specific order
```http
  GET https://ticketing.dev/api/orders/{orderId}
```
get specific order
    

---
### payments service
#### payments create:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `string` | **Required** |
| `token` | `string` | **Required** |
create an payments.
token come from Stripe or use the val "tok_visa" when dev.
---
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
    
get an ticket with id of {ticketId}.

#### get tickets:
```http
  GET https://ticketing.dev/api/tickets
```    
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
