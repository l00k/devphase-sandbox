#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod flipper {

    #[ink(event)]
    pub struct Flip {
        #[ink(topic)]
        account: AccountId,
        value: bool,
    }

    #[ink(storage)]
    pub struct Flipper {
        value: bool,
    }

    impl Flipper {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self {
                value: init_value
            }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
        }

        #[ink(message)]
        pub fn flip(&mut self) {
            self.value = !self.value.clone();

            let caller = Self::env().caller();
            Self::env().emit_event(Flip {
                account: caller,
                value: self.value.clone(),
            })
        }

        #[ink(message)]
        pub fn set(&mut self, value : bool) {
            self.value = value.clone();

            let caller = Self::env().caller();
            Self::env().emit_event(Flip {
                account: caller,
                value: value.clone(),
            })
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value.clone()
        }

        #[ink(message)]
        pub fn equals(&self, value : bool) -> bool {
            self.value == value
        }
    }
}
