const { SRT } = require('../build/Release/node_srt.node');
const EventEmitter = require("events");

const libSRT = new SRT();

class SRTServer extends EventEmitter {
  constructor() {
    super();
    this.socket = libSRT.createSocket();
  }

  listen({ address, port }) {
    const iface = address || "0.0.0.0";
    libSRT.bind(this.socket, iface, port);
    libSRT.listen(this.socket, 2);
    this.emit("listening", iface, port);
    while (true) {
      const fhandle = libSRT.accept(this.socket);
      console.log("Client connected");
    }
  }
}

module.exports = SRTServer;