# users have accounts 
# users have movies 
# movies belong to users 
# users can make their own top 10 list of their favorite movies. 

#user model 
- username: string
- email: string 
- name: string 


#movie model 
- img_src:string 
- title: string 
- description: text 
- rating: integer

user has many movies 
movies belong to a user 

