/* eslint-disable react/prop-types */

const WebsiteList = ({ websites, onDelete, searchTerm }) => {
  const handleDelete = (index) => {
    onDelete(index)
  }

  const highlight = (text) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <mark key={idx} className='bg-yellow-200'>
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className='max-w-2xl mx-auto p-4 text-gray-100'>
      <h1>Website List</h1>
      <ul className='space-y-4'>
        {websites.map((website, index) => (
          <li
            key={index}
            className='flex items-center space-x-4 border-b pb-2 relative'
          >
            <img
              src={`https://www.${website.website}.com/favicon.ico`}
              alt=''
              onError={(e) => {
                e.target.src =
                  'https://img.icons8.com/color/48/internet--v1.png'
              }}
              className='w-8 h-8 rounded-full'
            />
            <div className='flex-1'>
              <a
                href={`http://www.${website.website}.com`}
                target='_blank'
                rel='noreferrer'
                className='text-blue-500 hover:underline'
              >
                {highlight(`www.${website.website}.com`)}
              </a>

              <div className='text-gray-500 text-sm'>
                Username: {highlight(website.username)}
                <br />
                Password: {website.password}
              </div>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className='absolute top-0 right-0 text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-300'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WebsiteList
