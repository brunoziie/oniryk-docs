import { Heading } from '@/components/custom/typography';
import { Card } from '@/components/ui/card';
import { Globe, Paperclip, Send, Smile, SmilePlus } from 'lucide-react';
import Image from 'next/image';

export default function JournalingPage() {
  return (
    <div className="flex h-full w-full justify-center overflow-auto">
      <div className="w-full max-w-[640px] pt-16">
        <Heading className="mb-8 mt-4">Journaling</Heading>

        <Card className="mb-10 flex flex-col">
          <div className="flex gap-4 bg-white pl-5 pt-5">
            <Image
              src="/avatar3.png"
              alt="cover"
              width={32}
              height={32}
              className="h-[32px] w-[32px] rounded-full object-cover"
            />
            <textarea
              className="m-0 h-24 w-full resize-none outline-0"
              placeholder="What are you think about?"
            ></textarea>
          </div>
          <div className="flex h-10 place-content-between px-2 ">
            <div className="m-1 flex items-center justify-center gap-2">
              <select className="h-6 rounded-xl bg-zinc-200 px-2 text-sm text-zinc-600 outline-none">
                <option>Mc Donalds</option>
                <option>Santander</option>
              </select>

              <button className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-zinc-100">
                <Smile size={16} />
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-zinc-100">
                <Paperclip size={16} />
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-zinc-100">
                <Globe size={16} />
              </button>
            </div>

            <button className="m-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-zinc-100">
              <Send size={16} />
            </button>
          </div>
        </Card>

        {Array.from({ length: 4 })
          .fill('')
          .map(() => (
            <Card className="my-3 p-4">
              <div className="flex gap-4">
                <Image
                  src="/avatar3.png"
                  alt="cover"
                  width={32}
                  height={32}
                  className="h-[32px] w-[32px] rounded-full object-cover"
                />

                <div>
                  <div>
                    <span className="font-bold">John Doe</span> - 2 hours ago
                    <p className="pt-2">
                      Gostaria de enfatizar que o comprometimento entre as equipes
                      facilita a criação das posturas dos órgãos dirigentes com relação às
                      suas atribuições.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <span className="rounded-xl bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                      🙂 1
                    </span>
                    <span className="rounded-xl bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                      👍 5
                    </span>

                    <SmilePlus size={16} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
