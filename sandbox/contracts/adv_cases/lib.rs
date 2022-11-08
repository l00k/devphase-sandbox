#![cfg_attr(not(feature = "std"), no_std)]
#![feature(trace_macros)]

use ink_env::AccountId;
use ink_lang as ink;
use pink_extension as pink;


#[pink::contract(env=PinkEnvironment)]
mod adv_cases {
    use super::pink;
    use pink::{PinkEnvironment};

    use ink_prelude::{
        string::{String},
        vec::Vec,
    };
    use ink_storage::traits::{PackedLayout, SpreadAllocate, SpreadLayout};
    use ink_storage::Mapping;
    use scale::{Decode, Encode};


    #[derive(Debug, PartialEq, Eq, Encode, Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotFound,
        Unknonw,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    #[derive(
        Debug, PartialEq, Eq, Encode, Decode, Clone, SpreadLayout, PackedLayout
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    pub enum Role {
        User,
        Admin,
    }

    #[derive(
        Debug, PartialEq, Eq, Encode, Decode, Clone, SpreadLayout, PackedLayout
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    pub struct User {
        active: bool,
        name: String,
        role: Role,
        age: u8,
        salery: u64,
        favorite_numbers: Vec<u32>,
    }

    #[ink(storage)]
    #[derive(SpreadAllocate)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AdvCases {
        users: Mapping<u32, User>,
        users_num: u32,
        users_by_account: Mapping<AccountId, u64>,
    }

    impl AdvCases {
        #[ink(constructor)]
        pub fn default() -> Self {
            ink_lang::utils::initialize_contract(|this: &mut Self| {
                this.users_num = 0;
            })
        }

        #[ink(message)]
        pub fn add(&mut self, user : User) {
            self.users.insert(self.users_num.clone(), &user);
            self.users_num += 1;
        }

        #[ink(message)]
        pub fn get_user(&self, idx : u32) -> User {
            let user = self.users.get(idx);
            match user {
                None => User {
                    active: false,
                    name: String::from("none"),
                    role: Role::Admin,
                    age: 0,
                    salery: 0,
                    favorite_numbers: Vec::new(),
                },
                Some(user) => user,
            }
        }

        #[ink(message)]
        pub fn get_user_by_result(&self, idx : u32) -> Result<User> {
            self.users.get(idx).ok_or(Error::NotFound)
        }

        #[ink(message)]
        pub fn get_array(&self, text : String) -> Vec<u64> {
            Vec::new()
        }

        #[ink(message)]
        pub fn get_tuple(&self, text : String) -> (u64, String) {
            (10, text)
        }
    }
}
