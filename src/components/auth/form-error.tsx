

interface FromErrorProps {
    message?: string
}

export const FormError = ({
    message,
}: FromErrorProps) => {
    if(!message) return null;
    return (
        <div>
            <p>{message}</p>
        </div>
    )
}
