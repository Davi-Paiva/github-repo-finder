export const SelectorStyles = { 
    control: (base: any) => ({
        ...base,
        color: '#666666',
        fontSize: '0.8rem',
        borderRadius: '0.2rem',
        border: '1px solid #e1e4e8',
        width: '100%',
    }),
    indicatorSeparator: (base: any) => ({
        ...base,
        display: 'none',
    }),
    menu: (base: any) => ({
        ...base,
        fontSize: '0.8rem',
        marginTop: '0',
        borderRadius: '0',
    }),
    input: (base: any) => ({
        ...base,
        color: 'transparent',
    }),
    option: (base: any) => ({
        ...base,
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
    }),
};