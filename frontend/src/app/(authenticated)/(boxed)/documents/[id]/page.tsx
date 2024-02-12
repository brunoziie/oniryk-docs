'use client';

import EditableText from '@/components/custom/editable-text';
import { GitCommit } from 'lucide-react';
import Image from 'next/image';

const CheckpointItem = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-nowrap items-center justify-start gap-2">
      <div className="flex flex-[0_0_96px] flex-row items-center gap-2">
        <GitCommit size={16} />
        <span className=" text-sm text-zinc-400">2024.01.01</span>
      </div>

      <div className="flex gap-2 truncate text-ellipsis text-sm text-zinc-600">
        <a className="font-semibold" href="">
          @brunoziie
        </a>
        <p className="grow  truncate text-ellipsis text-sm">{text}</p>
      </div>
    </div>
  );
};

export default function DocumentPage() {
  return (
    <main className="flex justify-center pt-24">
      <div className="max-w-[768px]">
        <span className="text-sm text-zinc-400"> created 2 days ago </span>

        <EditableText
          className="text-5xl font-bold"
          html="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          onChange={() => {}}
          placeholder="Untitled document"
        />

        <div className="mb-8">
          <div className="mt-6 flex gap-8">
            <div>
              <span className="text-xs uppercase">author</span>

              <div className="flex gap-2">
                <div>
                  <Image
                    src="/avatar3.png"
                    width={32}
                    height={32}
                    alt="Avatar"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-sm font-semibold leading-none">bruno ziiê</h1>
                  <p className="text-xs leading-4 text-gray-400">@brunoziie</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase">members</span>

              <div className="flex gap-2">
                <Image
                  src="/avatar.png"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <Image
                  src="/avatar2.png"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <Image
                  src="/avatar3.png"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-6">
            <span className="text-xs uppercase">checkpoints</span>

            <CheckpointItem text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
            <CheckpointItem text="Doloribus praesentium nostrum consequatur distinctio, aperiam eum, iusto eligendi tempora aliquid earum tempore quod. " />
          </div>

          <div className="mb-4 mt-6 border-b border-zinc-100 dark:border-zinc-700"></div>
        </div>

        <p className="mb-4 leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A rerum possimus quia
          adipisci quos molestiae eos vitae delectus, consequatur veritatis cumque officia
          quo blanditiis voluptatum facere veniam quas rem doloremque!
        </p>

        <p className="mb-4 leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium
          nostrum consequatur distinctio, aperiam eum, iusto eligendi tempora aliquid
          earum tempore quod. Nemo cupiditate obcaecati voluptate quos corporis magnam
          veniam.
        </p>

        <p className="mb-4 leading-7">
          Rerum architecto fugit officiis error, repellendus quis nostrum dolore unde,
          velit earum corrupti accusamus nobis sed sint id, tempore exercitationem. Ab
          eveniet vero quas suscipit veritatis natus, doloremque corporis nobis
          voluptates? Nam, vero eos culpa aperiam id saepe consectetur voluptates,
          doloribus illum sed officia veniam ipsum sequi cum quo itaque ut consequuntur
          nihil autem at vitae, quidem maiores cupiditate! Et cupiditate qui facilis,
          nobis sequi commodi enim in, fugiat natus, expedita ab unde modi culpa. Labore
          vero corrupti sed alias voluptates dolores veniam nulla provident nihil
          molestias, cumque a ullam inventore vel eligendi ab officia delectus officiis
          esse ipsum saepe sit animi aliquam vitae. Dolorum numquam enim quis eveniet
          ullam accusantium sint dignissimos asperiores fugiat saepe voluptas, placeat qui
          maiores. Consequatur ea optio eius rem earum asperiores libero adipisci
          laboriosam reiciendis quis. Voluptate ab quos assumenda consectetur tenetur,
          eaque nostrum rem ullam numquam aut! Quam nemo animi odit tempore nesciunt! Iure
          deserunt culpa nihil in nobis nostrum iusto deleniti molestiae architecto
          accusantium odit beatae mollitia ipsa possimus ratione ut aperiam minus eligendi
          officia, dolorum ullam laboriosam dolor ea animi. Perferendis nam beatae,
          facilis aut omnis laboriosam incidunt doloremque nobis! Fuga, deserunt nobis!
        </p>
      </div>
    </main>
  );
}
