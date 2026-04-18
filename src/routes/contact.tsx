import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
    component: Contact,
})

function Contact() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Contact Page</h1>
        </div>
    )
}
