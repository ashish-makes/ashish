import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Ashish for collaborations, projects, or just a coffee chat.",
};

export default function Page() {
    return <ContactClient />;
}
