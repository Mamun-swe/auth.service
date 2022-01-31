const grpc = require("grpc")
var protoLoader = require("@grpc/proto-loader")
const PROTO_PATH = "./auth.proto"

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const DistrictService = grpc.loadPackageDefinition(packageDefinition).DistrictService;

const client = new DistrictService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;