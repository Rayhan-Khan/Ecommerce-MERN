import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type:category.type,
        children: [],
      },
    ];
  }
  const newCategory=  {
    _id: category._id,
    name: category.name,
    slug: category.slug,
    type:category.type,
    parentId: category.parentId,
    children: [],
  }
  let mycategories = [];
  for (let cat of categories) {
    if (cat._id === parentId) {
      mycategories.push({
        ...cat,
        children: cat.children.length>0? [...cat.children,newCategory]
          : [newCategory]
      });
    } else {
      mycategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return mycategories;
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategory = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updateCategory);
      state = {
        ...state,
        categories: updateCategory,
        loading: false,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = {
        ...initState,
        loading:false,
        error:action.payload.error
      };
      break;
      case categoryConstants.UPDATE_CATEGORY_REQUEST:
        state={
          ...state,
          loading:true
        }; break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
          state={
            ...state,
            loading:false
          }; break;
          case categoryConstants.UPDATE_CATEGORY_FAILURE:
        state={
          ...state,
          loading:false,
          error:action.payload.error
        }; break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
        state={
          ...state,
          loading:true
        }; break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
          state={
            ...state,
            loading:false
          }; break;
          case categoryConstants.DELETE_CATEGORY_FAILURE:
        state={
          ...state,
          loading:false,
          error:action.payload.error
        }; break;
    default:
      break;
  }
  return state;
};

export default categoryReducer;
