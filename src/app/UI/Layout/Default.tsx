import { useRouter } from 'next/router'

/**
 * The default layout component
 * @param {any} props - The components props
 * @returns {JSX}
 */
export default function DefaultLayout(props: any) {
    return (
        <div className="default-layout">
            {props.children}
        </div>
    );
}