import { useAppSelector } from '../../../../store';
import { Button } from '../../../shared/ui';

interface CategoriesBlockProps {
  applyCurrentCategory: (category: string) => void;
}

const CategoriesBlock: React.FC<CategoriesBlockProps> = ({ applyCurrentCategory }) => {
  const { data: categories, loading, error } = useAppSelector((state) => state.categories);

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex justify-center py-8">
          <div className="text-gray-400">Loading categories...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <div className="text-red-400 text-center py-8">{error}</div>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="mb-8">
        <p className="text-gray-400 text-center py-8">No categories available</p>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Categories</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="h-auto py-4 px-6 text-white hover:text-black"
            onClick={() => applyCurrentCategory(category.label)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesBlock;