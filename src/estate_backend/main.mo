import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor {
  type UserAccount = {
    id: Nat;
    fullName: Text;
    nationalId: Text;
    sex: Text;
    district: Text;
    password: Text;
  };

  var userAccounts : [UserAccount] = [];
  var nextId: Nat = 1;

  type Plan = {
    planId: Nat;
    userId: Nat;
    title: Text;
    textDescription: Text;
  };
  var plans: [Plan] = [];
  var nextPlanId: Nat = 1;

  public func registerUser(fullName: Text, nationalId: Text, sex: Text, district: Text, password: Text) : async Text {
    if (not isNationalIdUnique(nationalId)) {
      return "National ID already exists. Please choose another.";
    };
    
    let newUserAccount: UserAccount = {
      id = nextId;
      fullName = fullName;
      nationalId = nationalId;
      sex = sex;
      district = district;
      password = password;
    };
    userAccounts := Array.append(userAccounts, [newUserAccount]);
    nextId := nextId + 1;
    return "User account added successfully!";
  };

  public func getUserAccount(id: Nat) : async ?UserAccount {
    let account = Array.find<UserAccount>(userAccounts, func(account: UserAccount) : Bool {
      account.id == id;
    });
    return account;
  };
  
  public func updateUser(id: Nat, fullName: Text, nationalId: Text, sex: Text, district: Text, password: Text) : async Text {
    // if (!isNationalIdUnique(nationalId)) {
    //   return "National ID already exists. Please choose another.";
    // }
    
    let updatedUserAccount: UserAccount = {
      id = id;
      fullName = fullName;
      nationalId = nationalId;
      sex = sex;
      district = district;
      password = password;
    };
    userAccounts := Array.map<UserAccount, UserAccount>(userAccounts, func(account: UserAccount) : UserAccount {
      if (account.id == id) {
        updatedUserAccount
      } else {
        account
      }
    });
    return "User account updated successfully!";
  };

  public func deleteUser(id: Nat) : async Text {
    userAccounts := Array.filter<UserAccount>(userAccounts, func(account: UserAccount) : Bool {
      account.id != id
    });
    return "User account deleted successfully!";
  };

  public func getAllUsers() : async [UserAccount] {
    return userAccounts;
  };


  public func loginUser(id: Text, password: Text) : async ?UserAccount {
    let user = Array.find<UserAccount>(userAccounts, func(account: UserAccount) : Bool {
      account.nationalId == id and account.password == password;
    });
    return user;
  };

  private func isNationalIdUnique(nationalId: Text) : Bool {
    Array.find(userAccounts, func(account: UserAccount) : Bool {
      account.nationalId == nationalId;
    }) == null;
  };




    // Plan Operations

  public func addPlan(userId: Nat, title: Text, textDescription: Text) : async Text {
    let newPlan: Plan = {
      planId = nextPlanId;
      userId = userId;
      title = title;
      textDescription = textDescription;
    };
    plans := Array.append(plans, [newPlan]);
    nextPlanId := nextPlanId + 1;
    return "Plan added successfully!";
  };

  public func getPlan(planId: Nat) : async ?Plan {
    Array.find<Plan>(plans, func(plan: Plan) : Bool {
      plan.planId == planId;
    });
  };

  public func updatePlan(planId: Nat, userId: Nat, title: Text, textDescription: Text) : async Text {
    let updatedPlan: Plan = {
      planId = planId;
      userId = userId;
      title = title;
      textDescription = textDescription;
    };
    plans := Array.map<Plan, Plan>(plans, func(plan: Plan) : Plan {
      if (plan.planId == planId) {
        updatedPlan;
      } else {
        plan;
      };
    });
    return "Plan updated successfully!";
  };

  public func deletePlan(planId: Nat) : async Text {
    plans := Array.filter<Plan>(plans, func(plan: Plan) : Bool {
      plan.planId != planId;
    });
    return "Plan deleted successfully!";
  };

  public func getAllPlans() : async [Plan] {
    return plans;
  };

  public func getPlansByUserId(userId: Nat) : async [Plan] {
    Array.filter<Plan>(plans, func(plan: Plan) : Bool {
      plan.userId == userId;
    });
  };
  
}
