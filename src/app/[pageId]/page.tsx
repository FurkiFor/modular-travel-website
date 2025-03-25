import { Metadata } from 'next';
import { getPage } from '@/lib/data/api';
import { PageBuilder } from '@/components/PageBuilder';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    pageId: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    console.log('Generating metadata for page:', params.pageId);
    const pageConfig = await getPage(params.pageId);
    console.log('Page config loaded:', pageConfig);
    
    if (!pageConfig || !pageConfig.layout) {
      console.error('Invalid page config structure:', pageConfig);
      return {
        title: 'Rota24',
        description: 'Rota24 açıklaması',
      };
    }

    return {
      title: pageConfig.layout.name,
      description: pageConfig.layout.description,
      ...(pageConfig.layout.metaTags && {
        keywords: pageConfig.layout.metaTags.keywords,
        openGraph: {
          title: pageConfig.layout.metaTags.ogTitle || pageConfig.layout.name,
          description: pageConfig.layout.metaTags.ogDescription || pageConfig.layout.description,
          images: pageConfig.layout.metaTags.ogImage ? [{ url: pageConfig.layout.metaTags.ogImage }] : undefined,
        }
      })
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Rota24',
      description: 'Rota24 açıklaması',
    };
  }
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    console.log('Loading page:', params.pageId);
    const pageConfig = await getPage(params.pageId);
    console.log('Page config loaded successfully:', pageConfig);

    if (!pageConfig || !pageConfig.sections) {
      console.error('Invalid page config structure:', pageConfig);
      notFound();
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <PageBuilder pageConfig={pageConfig} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}