FROM golang:1.25.1-alpine AS builder

WORKDIR /app

COPY server/go.mod server/go.sum ./

RUN go mod download

COPY server/ ./

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /server ./cmd/main.go

FROM alpine:latest

COPY --from=builder /server /server

EXPOSE 8080

ENV PORT 8080

CMD ["/server"]