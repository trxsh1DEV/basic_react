import './styles.css'

export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <input
        className='text-input'
        placeholder='Type your search'
        onChange={(e) => handleChange(e)}
        type="search"
        value={searchValue}/>
    )
}