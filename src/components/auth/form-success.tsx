

interface FromSuccessProps {
    message?: string
}

export const FormSuccess = ({
    message,
}: FromSuccessProps) => {
    if(!message) return null;
    return (
        <div>
            <p>{message}</p>
        </div>
    )
}
