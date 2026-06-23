import Avatar from '../assets/images/avatars/avatar_1.png'

const WhatsOnMind = () => {
  return (
    <div className="card">
            <div className="flex-center mb-3 gap-2 lg:gap-4">
              <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={Avatar} alt="avatar" />

              <div className="flex-1">
                <textarea className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6" name="post"
                  id="post" placeholder="What's on your mind?"></textarea>
              </div>
        </div>
      </div>
  )
}

export default WhatsOnMind