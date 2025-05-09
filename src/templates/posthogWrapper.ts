export const postHogWrapperTemplate = `import {PostHogProvider} from "posthog-js/react";
import { type PropsWithChildren } from "react";

const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

const PostHogProviderWrapper = ({children}: PropsWithChildren) => {
    // Only render PostHog provider if we are in production
    if (import.meta.env.PROD) {
        
        // Make sure PostHog api key is defined
        if (!import.meta.env.VITE_PUBLIC_POSTHOG_KEY) {
            throw new Error('PostHog API key is not defined');
        }
        
        return (
            <PostHogProvider
                apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
                options={options}
            >
                {children}
            </PostHogProvider>
        );
    }
    return <>{children}</>;
};

export {PostHogProviderWrapper};
`;
