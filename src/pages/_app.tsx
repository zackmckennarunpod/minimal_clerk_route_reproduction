import { ClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { createRef } from "react";
import type { AppProps } from "next/app";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
      NEXT_PUBLIC_AUTH0_DOMAIN: string;
      NEXT_PUBLIC_AUTH0_REDIRECT_URI: string;
      NEXT_PUBLIC_AUTH0_AUDIENCE: string;
    }
  }
}

export default function MyApp(props: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, shrink-to-fit=no"
        />
      </Head>
      <ClerkProvider {...props.pageProps}>
        <AppLayout {...props} />
      </ClerkProvider>
    </>
  );
}

function AppLayout({ Component, pageProps }) {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
