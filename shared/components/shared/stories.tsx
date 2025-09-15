'use client';
import React from 'react';
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

export const Stories: React.FC<{ className?: string }> = ({ className }) => {
    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();
    const storyRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        (async () => setStories(await Api.stories.getAll()))();
    }, []);

    const onClickStory = (story: IStory) => {
        if (story.items.length > 0) {
            setSelectedStory(story);
            setOpen(true);
        }
    };

    // Блокируем скролл и вешаем Escape
    React.useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e: KeyboardEvent) =>
            e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <>
            <Container
                className={cn(
                    'flex items-center justify-between gap-2 my-10',
                    className
                )}
            >
                {stories.length === 0 &&
                    [...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
                        />
                    ))}

                {stories.map((story) => (
                    <img
                        key={story.id}
                        src={story.previewImageUrl}
                        onClick={() => onClickStory(story)}
                        className="rounded-md cursor-pointer"
                        height={250}
                        width={200}
                        alt=""
                    />
                ))}
            </Container>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    style={{ height: '100dvh' }}
                    onClick={() => setOpen(false)} // клик по фону — закрыть
                >
                    <div
                        ref={storyRef}
                        className="relative"
                        onClick={(e) => e.stopPropagation()} // клики внутри — не закрывать
                        style={{
                            width: 520,
                            maxWidth: '90vw',
                        }}
                    >
                        <button
                            className="absolute -top-5 -right-10 z-50"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            <X className="w-8 h-8 text-white/70" />
                        </button>

                        <ReactStories
                            onAllStoriesEnd={() => setOpen(false)}
                            stories={
                                selectedStory?.items.map((i) => ({
                                    url: i.sourceUrl,
                                })) || []
                            }
                            width={420}
                            height={Math.min(
                                600,
                                typeof window !== 'undefined'
                                    ? window.innerHeight * 0.85
                                    : 600
                            )}
                            defaultInterval={3000}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
