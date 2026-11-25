import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import ProfilePage from '../../components/profile';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const user = await fetch(`https://.../${id}`).then((res) => res.json());
  if (!user) notFound();

  return {
    title: user.name,
    description: 'your prifile',
  };
}

export default function AccountPage() {
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <ProfilePage />
      </Suspense>
    </section>
  );
}
