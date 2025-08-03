export interface NavItem {
    label: string;
    path: string;
  }
  
  export const navItems: NavItem[] = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Posts', path: '/dashboard/posts/list' },
    { label: 'Create Post', path: '/dashboard/posts/create' },
    // { label: 'Difficulty Level', path: '/difficultyLevel' },
    // { label: 'Quiz Form', path: '/quizForm' },
    // { label: 'Multiple Question', path: '/questions' },
    // { label: 'Answer Management', path: '/answers' },
    // { label: 'Attempt Results', path: '/attemptResults' },
    // { label: 'View Quiz', path: '/quiz' },
    // { label: 'History Page', path: '/my-attempts' }
  ];