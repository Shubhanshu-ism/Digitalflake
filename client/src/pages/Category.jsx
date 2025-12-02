import Dashboard from './Dashboard';

const Category = () => {
    return (
        <div>
            {/* Reusing Dashboard component for now as the design is similar, 
            but in a real app this would have its own logic/api call */}
            <Dashboard />
        </div>
    );
};

export default Category;
