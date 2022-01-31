const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const PROTO_PATH = "auth.proto"

// grpc intigration
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const authProto = grpc.loadPackageDefinition(packageDefinition)
const grpcServer = new grpc.Server()

let news = [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
];

grpcServer.addService(authProto.DistrictService.service, {
    getAll: (_, callback) => {
        callback(null, { news })
    }
})


grpcServer.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        grpcServer.start();
    }
);