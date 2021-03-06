<h1 align="center">
  <img height="100px" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img alt="SRT" src="http://www.srtalliance.org/wp-content/uploads/SRT_text_hor_logo_grey.png" width="300"/>
</h1>

`@eyevinn/srt` is a Node.js Native Addon that provides bindings to [Secure Reliable Transport SDK](https://github.com/Haivision/srt).

## Install

```
npm install --save @eyevinn/srt
```

Installing from NPM downloads and builds SRT SDK and NodeJS addon for your operating system × architecture.

## Example

```
const { SRT } = require('@eyevinn/srt');

const srt = new SRT();
const socket = srt.createSocket();
srt.bind(socket, "0.0.0.0", 1234);
srt.listen(socket, 2);
const fd = srt.accept(socket);
if (fd) {
  const chunk = srt.read(fd, 1316);
}
```

## API

```
class SRT {
  createSocket(sender?:Boolean): socket:Number
  bind(socket:Number, address:String, port:Number): result:Number
  listen(socket:Number, backlog:Number): result:Number
  connect(socket:Number, host:String, port:Number): result:Number
  accept(socket:Number): fileDescriptor:Number
  close(socket:Number): result:Number
  read(socket:Number, chunkSize:Number): chunk:Buffer
  write(socket:Number, chunk:Buffer): result:Number
  setSockOpt(socket:Number, option:Number, value): result:Number
  getSockOpt(socket:Number, option:Number): value
  getSockState(socket:Number): value:Number
  epollCreate(): epid:Number
  epollAddUsock(epid:Number, socket:Number, events:Number): result:Number
  epollUWait(epid:Number, msTimeOut:Number): events:Array
}
```

### Readable Stream
A custom readable stream API is also available, example (in listener mode):

```
const fs = require('fs');
const dest = fs.createWriteStream('./output');
const { SRTReadStream } = require('@eyevinn/srt');

const srt = new SRTReadStream('0.0.0.0', 1234);
srt.listen(readStream => {
  readStream.pipe(dest);
});
```

of in caller mode:

```
const srt = new SRTReadStream('127.0.0.1', 1234);
srt.connect(readStream => {
  readStream.pipe(dest);
});
```

### Writable Stream

Example of a writable stream

```
const fs = require('fs');
const source = fs.createReadStream('./input');
const { SRTWriteStream } = require('@eyevinn/srt');

const srt = new SRTWriteStream('127.0.0.1', 1234);
srt.connect(writeStream => {
  source.pipe(writeStream);
});
```

## [Contributing](CONTRIBUTING.md)

In addition to contributing code, you can help to triage issues. This can include reproducing bug reports, or asking for vital information such as version numbers or reproduction instructions. 

## License (MIT)

Copyright 2020 Eyevinn Technology

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!