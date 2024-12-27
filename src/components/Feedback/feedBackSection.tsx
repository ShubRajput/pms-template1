import FeedbackCard from './feedBackCar';

const feedbacks = [
  {
    name: 'Ashley T. Childers',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe asperiores odit perspiciatis.'
  },
  {
    name: 'Robert E. Cain',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe asperiores odit perspiciatis.'
  },
  {
    name: 'Brad J. Barnes',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe asperiores odit perspiciatis.'
  },
  {
    name: 'Frances G. Becerra',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    rating: 5,
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe asperiores odit perspiciatis.'
  }
];

const FeedbackSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            What Our Customers<br />
            Say About Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.name} {...feedback} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;