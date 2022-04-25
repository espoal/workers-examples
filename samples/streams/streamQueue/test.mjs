import { WritableStream, ReadableStream } from 'node:stream/web'


const writable = new WritableStream()


const writer = await writable.getWriter()

await writer.write(4)

const readable = new ReadableStream({
  
})




for await (const chunk of readable) {
  console.log({ chunk})

}
